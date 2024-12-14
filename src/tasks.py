"""Task management functionality for the Gemini Collaborator App."""

class TaskManager:
    def __init__(self):
        self.tasks = []

    def add_task(self, title, description, priority="medium"):
        task = {
            "title": title,
            "description": description,
            "priority": priority,
            "status": "pending"
        }
        self.tasks.append(task)
        return task