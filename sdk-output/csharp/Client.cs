using System.Net.Http;
using System.Text;
using System.Text.Json;
namespace SentraCoreSDK;
public class SentraCoreClient {
private readonly HttpClient _http;
private string _token;
public SentraCoreClient(string baseUrl) { _http = new HttpClient { BaseAddress = new Uri(baseUrl) }; }
public void SetToken(string token) { _token = token; }
private async Task<T> Req<T>(HttpMethod m, string path, object body = null) {
var req = new HttpRequestMessage(m, path);
if (_token != null) req.Headers.Add("Authorization", "Bearer " + _token);
if (body != null) req.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");
var res = await _http.SendAsync(req);
res.EnsureSuccessStatusCode();
var json = await res.Content.ReadAsStringAsync();
if (json.Length == 0) return default;
return JsonSerializer.Deserialize<T>(json);
}

public async Task<User> getMe() {
return await Req<User>(HttpMethod.GET, "/me");
}

}
