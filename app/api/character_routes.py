# routes
from flask import Blueprint, jsonify, redirect, request
from app import db
from app.models import Character
from flask_login import current_user, login_required
#import forms
from app.forms import CreateCharacterForm
