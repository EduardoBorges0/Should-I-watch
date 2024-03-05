from django.db import models


# Create your models here.
class Cadastro(models.Model):
    username = models.CharField(max_length=20)
    email = models.EmailField()
    senha = models.CharField(max_length=15)

    def __str__(self):
        return self.email, self.senha


class API(models.Model):
    country = models.CharField(max_length=10)
    city = models.CharField(max_length=30)

    def __str__(self):
        return self.country, self.city
