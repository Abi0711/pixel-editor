from django.urls import path
from . import views
urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list-create"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="note-delete"),
    path("pixel-art/", views.PixelArtCreate.as_view(), name="pixel-art-create"),
    path("pixel-art/delete/<int:pk>/", views.PixelArtDelete.as_view(), name="pixel-art-delete"),
        
]