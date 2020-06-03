from django.shortcuts import render
from webapp.models import employees
from .serializers import employeesSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


@api_view(['GET', 'POST'])
def employeeList(request):
    if request.method == 'GET':
        employee = employees.objects.all()
        serializer = employeesSerializer(employee, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        request.data['emp_id'] = employees.objects.count() + 1
        serializer = employeesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def employeeDetail(request, pk):
    try:
        employee = employees.objects.get(pk=pk)
    except employees.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = employeesSerializer(employee)
        return Response(serializer.data)

    elif request.method == 'PUT':
        request.data['emp_id'] = employeesSerializer(employee).data['emp_id']
        serializer = employeesSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
