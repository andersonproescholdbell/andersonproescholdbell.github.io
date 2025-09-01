from chalice import Chalice
import base64, json, random
import requests
app = Chalice(app_name='backend')


@app.route('/realFace')
def index():
    number = random.randrange(0,300)
    

    if 100 <= number <= 300:

        with open("00000/00" + str(number) + ".png", "rb") as image:
            f = image.read()
            
            return base64.b64encode(f)

    elif 10 <= number <= 99:
        with open("00000/000" + str(number) + ".png", "rb") as image:
            f = image.read()
            return base64.b64encode(f)
    else:
        with open("00000/0000" + str(number) + ".png", "rb") as image:
            f = image.read()
            return base64.b64encode(f)


@app.route('/AIFace')
def face():
    r = requests.get('https://api.generated.photos/api/v1/faces?api_key=pmturXvb_bFbm05gIjjkTA')
    faceList = r.json()["faces"]

    workingFace = random.choice(faceList)

    return workingFace["urls"][-1]["512"]



   



    

    

    


# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.
#
# Here are a few more examples:
#
# @app.route('/hello/{name}')
# def hello_name(name):
#    # '/hello/james' -> {"hello": "james"}
#    return {'hello': name}
#
# @app.route('/users', methods=['POST'])
# def create_user():
#     # This is the JSON body the user sent in their POST request.
#     user_as_json = app.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
#     return {'user': user_as_json}
#
# See the README documentation for more examples.
#
