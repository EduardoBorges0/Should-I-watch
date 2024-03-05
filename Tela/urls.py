from django.urls import path
from . import views
from django.views.generic import RedirectView
urlpatterns = [
    path('', RedirectView.as_view(url='/cadastro', permanent=False)),
    path("cadastro/", views.cadastros, name='cadastro'),
    path("login/", views.login, name='login'),
    path("home/", views.home, name='home'),
    path("forgot_pass/", views.forgot_pass, name='forgot_pass'),
    path("code_request/", views.code_request, name='code_request'),
    path('recover_pass/', views.recover_pass, name='recover_pass'),
    path('logout/', views.logout_view, name='logout'),
]