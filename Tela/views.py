from django.shortcuts import render, redirect
from .models import Cadastro
from django.contrib.auth.models import User
from django.contrib.auth import login as login_django
from django.contrib.auth import authenticate, update_session_auth_hash, logout
from django.contrib.auth.decorators import login_required
from django.urls import reverse
import smtplib
import email.message
import random


# Create your views here.
def cadastros(request):
    if request.method == "GET":
        return render(request, 'cadastro.html')
    else:
        username = request.POST.get('username')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        if not username or not email or not senha:
            return render(request, 'cadastro.html', {'empty_fields': True})
        user = User.objects.filter(username=username).first()
        email = User.objects.filter(email=email).first()
        if user:
            return render(request, 'cadastro.html', {'invalid_username': True})
        if email:
            return render(request, 'cadastro.html', {'invalid_email': True})
        cadastro = Cadastro(username=username, email=email, senha=senha)
        user = User.objects.create_user(username=username, email=email, password=senha)
        user.save()
        cadastro.save()
        return render(request, 'login.html')


def login(request):
    if request.method == "GET":
        return render(request, 'login.html')
    else:
        username = request.POST.get('username')
        senha = request.POST.get('senha')
        if not username or not senha:
            return render(request, 'login.html', {'empty_fields': True})
        user = authenticate(username=username, password=senha)
        if user:
            login_django(request, user)
            request.session['username'] = username
            return redirect(reverse('home'))
        else:
            return render(request, 'login.html', {'invalid_credentials': True})


@login_required(login_url='/cadastro/')
def home(request):
    if request.method == "GET":
        username = request.session.get('username')
        return render(request, 'home.html', {'username': username})


def send_email(gmail, random_code):
    msg = email.message.Message()
    msg['Subject'] = "Recuperação de senha 'Should i watch'"
    msg['From'] = "testeempresa496@gmail.com"
    password = "unsq wkay biqw zccd"
    msg.add_header("Content-Type", "text/html")
    recipient_email = gmail
    corpo = msg.HTMLBody = f"""
    O código para sua recuperação de senha é {random_code}
    """
    msg.set_payload(corpo)
    smt = smtplib.SMTP('smtp.gmail.com', port=587)
    smt.starttls()
    smt.login(msg['From'], password)
    smt.sendmail(msg['From'], recipient_email, msg.as_string().encode('utf-8'))


def forgot_pass(request):
    if request.method == 'GET':
        return render(request, 'pass_recovery.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        user = User.objects.get(username=username)
        email = user.email
        random_code = random.randint(1000, 9999)
        request.session['random_code'] = random_code
        send_email(email, random_code)
        return render(request, 'send_email.html')


def code_request(request):
    random_input = int(request.POST.get('random_code'))
    random_number = request.session.get('random_code')
    if random_input == random_number:
        return redirect(reverse('recover_pass'))
    else:
        return render(request, 'send_email.html', {'invalid_code': True})


def recover_pass(request):
    if request.method == "GET":
        return render(request, 'recover-pass.html')
    elif request.method == 'POST':
        if request.user.is_authenticated:
            new_pass = request.POST.get('new_pass')
            repeat_pass = request.POST.get('repeat-pass')
            if new_pass == repeat_pass:
                user = request.user
                user.set_password(new_pass)
                user.save()
                update_session_auth_hash(request, user)
                return render(request, 'login.html')
            else:
                return render(request, 'recover-pass.html', {'different_passwords': True})
        else:
            return render(request, 'login.html', {'authenticated_false': True})
    else:
        return render(request, 'recover-pass.html', {'different_passwords': True})


def logout_view(request):
    logout(request)
    return redirect('login')
