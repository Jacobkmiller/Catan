from django.shortcuts import render, redirect, reverse
from . import forms

# Create your views here.


def index(request):
	return render(request, 'Game/index.html')


def zak(request):
	return render(request, 'Game/Zak_Pixi.html')


def welcome(request):

	if request.method == "POST":
		form = forms.StartForm(request.POST)

		if form.is_valid():
			# request.session.update(form.cleaned_data)
			players = []
			colors = []
			data = {}
			color_key = {1: 0xCC0000, 2: 0x037C21, 3: 0x0B0B8E, 4: 0xF2F2F2}
			for key, value in sorted(form.cleaned_data.items()):
				if "name" in key:
					if value is not None and value != "":
						players.append(value)
				elif "color" in key:
					colors.append(color_key[int(value)])

			for i in range(len(players)):
				data[players[i]] = colors[i]

			request.session['players'] = data

			return redirect('catan')

	else:
		form = forms.StartForm()

	return render(request, 'Game/welcome.html', {'form': form})


def player_maker(request):

	if request.method == 'POST':
		print(request.POST)
		form = forms.StartForm(request.POST)

		if form.is_valid():
			return redirect("gameboard")


def catan(request):
	return render(request, "Game/catan.html", request.session)

def panel(request):
	return render(request, "Game/panel.html", request.session)

