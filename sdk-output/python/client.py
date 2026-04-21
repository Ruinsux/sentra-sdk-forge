import requests
class SentraCoreClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.token = None
    def set_token(self, token):
        self.token = token
    def req(self, method, path, body=None):
        headers = {}
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        r = requests.request(method, self.base_url + path, json=body, headers=headers)
        r.raise_for_status()
        if not r.text:
            return None
        return r.json()

    def getMe(self):
        return self.req("GET", "/me")
