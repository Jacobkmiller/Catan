from django import forms
from . import models


class PlayerForm(forms.ModelForm):
	class Meta:
		model = models.Player
		fields = "__all__"


class StartForm(forms.Form):
	choices = [[1, "Red"], [2, "Green"], [3, "Blue"], [4, "White"]]
	player_choices = [[2, 2], [3, 3], [4, 4]]
	number_of_players = forms.ChoiceField(widget=forms.Select, choices=player_choices)
	p1_name = forms.CharField(max_length=25)
	p1_color = forms.ChoiceField(widget=forms.Select, choices=choices)
	p2_name = forms.CharField(max_length=25)
	p2_color = forms.ChoiceField(widget=forms.Select, choices=choices)

	p3_name = forms.CharField(max_length=25, required=False)
	p3_color = forms.ChoiceField(required=False, widget=forms.Select, choices=choices)
	p4_name = forms.CharField(max_length=25, required=False)
	p4_color = forms.ChoiceField(required=False, widget=forms.Select, choices=choices)

	def clean(self):
		cleaned_data = super(StartForm, self).clean()
		total_players = int(cleaned_data['number_of_players'])
		p1_name = cleaned_data['p1_name'].lower()
		p1_color = cleaned_data['p1_color']
		p2_name = cleaned_data['p2_name'].lower()
		p2_color = cleaned_data['p2_color']
		p3_name = cleaned_data['p3_name'].lower()
		p3_color = cleaned_data['p3_color']
		p4_name = cleaned_data['p4_name'].lower()
		p4_color = cleaned_data['p4_color']

		if total_players == 4:
			if p3_name == '' or p3_name is None:
				self.add_error('p3_name', "Please provide a name for player 3")
			if p4_name == '' or p4_name is None:
				self.add_error('p4_name', "Please provide a name for player 4")
			if p1_color in [p2_color, p3_color, p4_color] or p2_color in [p3_color, p4_color] or p3_color == p4_color:
				raise forms.ValidationError("All players must have a different color")
			if p1_name in [p2_name, p3_name, p4_name] or p2_name in [p3_name, p4_name] or p3_name == p4_name:
				raise forms.ValidationError("All players must have a unique name")

		elif total_players == 3:
			if p3_name == '' or p3_name is None:
				self.add_error('p3_name', "Please provide a name for player 3")
			if p1_color in [p2_color, p3_color] or p2_color == p3_color:
				raise forms.ValidationError("All players must have a different color")
			if p1_name in [p2_name, p3_name] or p2_name == p3_name:
				raise forms.ValidationError("All players must have a unique name")

		else:
			if p1_color == p2_color:
				raise forms.ValidationError("All players must have a different color")
			if p1_name == p2_name:
				raise forms.ValidationError("All players must have a unique name")

		if p1_name.lower() == 'jake' or p1_name.lower() == 'skillz4billz':
			self.add_error('p1_name', "Sorry, Jake. You are a number 2, not a number 1.")
		elif 'gail' in [p1_name.lower(), p2_name.lower(), p3_name.lower(), p4_name.lower()]:
			self.add_error('p1_name', "Sorry, no smelly people allowed Gail (even good smelling).")
