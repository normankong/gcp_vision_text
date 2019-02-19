# gcp_vision_text
Cloud Function to proceed google cloud vision text

Request Parameter
Content-Type : "application/json"

Body 
{
    url : IMAGE_URL
}

Response

{
    code : "200",
    message : The parsable message
    raw : Raw information from GCP Response
}

Failure case
If no URL passed : Bad request

If the image is not contains any text
{
    code : "099",
    message : "URL do not contains any text"
}


Setup
Require a .env file and credential.json which is download from Google Vision API

.env
GOOGLE_APPLICATION_CREDENTIALS=key/credential.json

credential.json
{
    "type": "service_account",
    "project_id": "",
    "private_key_id": "",
    "private_key": "-----BEGIN PRIVATE KEY-----\\nDn6T1LbNI8Z+ZFngS8h4ydR9/VK8gBFbzAxsz7GHpc6A928ODhH7cr5MN7Ocp0xjCS\niKSoaC9NBGVri8Z8KKJIkDiJHDf4rzDHSdV44zlA/qqfCOVUtZbLSHaRrHVAqr8k\nX4OvXw+rAgMBAAECggEAMeKof5NSGB8wCem7KAhV/YhVl1djsIpKdwax2QErKm/3\nupFAVbBz8iad8Nmsbt8nJZ1PiRUicgAswlSBb3vbbD4X1ShLKduTXYjNVrFgt6wm\nplu9fywOWkkcYBYYrZ8OYIIkxiVsWj+oRAc+GZjHtAvyW8VfmL8+6RI6vw0WxTZd\nQogS2A6O+zdfkJhpFVV5svVQFlSrk19VY0m7g3+GFcrrDbSeZiJY2ZdTfS7CVIwc\nTBBowsX8/p8gjuonl1oYr/VOSPAYp9IgphfgXerT0RFsdA6VWbKFnwltYlC/sncB\n+KmqFKaXD/C/Bt+ah0UCa33mXs72g8Sk6wJjuSsrdQKBgQDOUgEu1R9QPLXWvg5d\nd8cbVWRmi/AhHmoPSxkZu13QbMsxN/cOsMQlKj2HKsk6ye6z+DwW0totzit8V25g\nJXPyZRjvO/EkqkpICKOC8cldfwwhVgVqNm+KXBuJYFya0KBgs0WvsPk13NftpccT\neLO+Yz5k3Dp/sBwi9fKMxEZadwKBgQDDmvCnQsguWW2/txxhhp1eAPi7YSmwcN9T\nfTYsGiDANcXKZRin71mgfh39u2LSsnWWpyqxxdODJ5GL+0CUIcR4Ccgz/FlPpeYE\n9u/oniuaJu5wkQ1+UgHPJD6pLOgm7Wbjr1EZJ7PzAQFRMe8QxexIq656G3DrGA0W\nG/R2veGNbQKBgAU93hvTfE0sja4b+/9x6JQQMlHMolglDqq+zK9zrCl8ahkhA9zS\nrtkG3rNNafldYfwehWBLERHy1/X7vqkgqnZxDRYe3ryAuwxjc8wC2ovOi39ZUR/m\nrCTGvEhcM14XiMuMImwZQeuVZcL64DjlayOeH9quIapWzhAxUW00G1l3AoGAHDeH\nq7k4g2cnK9bQY0k1/k+Jkg5MI0XFEZgobmg+fTvEkpPO4LroZPyMewPDF73itJ7c\ny9RL1Mmqd1UBVd0hKGfQ1575i0HVUrYEmbvnck9Xaimilqxh0m3aFDGEM8lfZEzw\nF/7gOJfWhs37PKIwmbMackbvHRrVGHFj7JUrqmkCgYEAtHvqp8Yqh9vv9v4qm6YA\nB2b5p5FBchVx6H3QKgbKtZyvAX8ZfFWL+ooLjSxh/gsxK8H+ILoMad8XNCv+zhZR\nhHqdBeuzzzG30aRBWxKi2BDkVFqrGZsxHjPOaMa8nFstHJE/DH8+f/8GLhO+Q1Jt\n4VFWFmHiZD2AIuWwc7z52tY=\n-----END PRIVATE KEY-----\n",
    "client_email": "xxxxx@appspot.gserviceaccount.com",
    "client_id": "xxxx",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/%40appspot.gserviceaccount.com"
}

Deployment
Local Simulator  
    functions deploy handle --trigger-http
Read Log
    functions logs read
