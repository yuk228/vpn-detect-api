
# VPN / Proxy / Hosting Detector

API for detecting VPN, proxy, and hosting services by IP address.



## ⚠️ Rate Limits
- **Limit:** 100 requests per 60 seconds
- **Headers:** Rate limit info included in response headers

## 📡 Endpoints

### Check Specific IP Address

```http
GET /api/{ipv4}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ipv4` | string | Yes | Valid IPv4 address to check |

**Example Request:**
```bash
curl -X GET "https://vpn-detect-api.vercel.app/api/isvpn/1.1.1.1"
```

### Check Your Own IP Address

```http
GET /api/
```

**Description:** Automatically detects and checks the client's IP address

**Example Request:**
```bash
curl -X GET "https://vpn-detect-api.vercel.app/api/isvpn"
```

## 📋 Response Format

All responses are returned in JSON format with appropriate HTTP status codes.

### ✅ Successful Responses

#### VPN/Proxy/Hosting Detected
```json
{
  "ip": "1.2.3.4",
  "isVpn": true
}
```

#### Regular IP Address
```json
{
  "ip": "1.2.3.4",
  "isVpn": false
}
```

### ❌ Error Responses

#### Invalid IP Address
**Status Code:** `400 Bad Request`
```json
{
  "error": "Invalid IP address"
}
```

#### ASN Not Found
**Status Code:** `404 Not Found`
```json
{
  "error": "ASN not found"
}
```

#### Rate Limit Exceeded
**Status Code:** `429 Too Many Requests`
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 60
}
```

#### Server Error
**Status Code:** `500 Internal Server Error`
```json
{
  "error": "Internal server error"
}
```


## 🔧 HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| `200` | Success |
| `400` | Bad Request - Invalid IP format |
| `404` | Not Found - ASN not found |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error |
