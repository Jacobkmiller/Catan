from django.shortcuts import render

# Create your views here.
def index(request):
	return render(request, 'Game/index.html')

def zak(request):
	return render(request, 'Game/Zak_Pixi.html')