from django.db import models

# Create your models here.


class employees(models.Model):
    emp_id = models.IntegerField()
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)

    def __str__(self):
        return self.firstname
