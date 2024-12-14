"""Memory management for storing and retrieving logs."""

class MemoryManager:
    def __init__(self):
        self.memory_logs = []

    def add_log(self, content, category="general"):
        log = {
            "content": content,
            "category": category,
            "timestamp": "auto"
        }
        self.memory_logs.append(log)
        return log