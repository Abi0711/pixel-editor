from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title


class PixelArt(models.Model):
    SIZE_CHOICES = [
        (8, "8x8"),
        (16, "16x16"),
    ]

    artist = models.ForeignKey(User, on_delete=models.CASCADE, related_name="artworks")
    title = models.CharField(max_length=100, default="Untitled")
    size = models.PositiveSmallIntegerField(choices=SIZE_CHOICES, default=16)

    pixels = models.JSONField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        super().clean()
        expected_length = self.size * self.size
        if not isinstance(self.pixels, list):
            raise ValidationError({"pixels": "Pixels must be a list of color strings."})
        if len(self.pixels) != expected_length:
            raise ValidationError(
                {
                    "pixels": f"Expected {expected_length} pixels for {self.size}x{self.size}, got {len(self.pixels)}."
                }
            )

    def __str__(self):
        return f"{self.title} ({self.size}x{self.size}) by {self.user.username} on {self.created_at.strftime('%d/%m/%Y %H:%M:%S')}"
