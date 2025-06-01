from rest_framework.views import APIView
from rest_framework.response import Response
from decouple import config
import requests
import json


def auth_fedex():
    try:
        data = {
            'grant_type': 'client_credentials',
            'client_id': config('FEDEX_API_KEY'),
            'client_secret': config('FEDEX_SECRET_KEY')
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        response = requests.post(
            f"{config('FEDEX_BASE_API_URL')}/oauth/token", data=data, headers=headers)

        res_json = response.json()

        if response.status_code == 200 and 'access_token' in res_json:
            return res_json
        else:
            print("FedEx Auth Error:", res_json)
            return None

    except Exception as e:
        print('Error authenticating with FedEx API:', e)
        return None


class FedexTrackingView(APIView):
    def post(self, req):
        authRes = auth_fedex()
        if not authRes or 'access_token' not in authRes:
            return Response({'error': 'FedEx authentication failed'}, status=500)

        tracking_number = req.data.get('trackingNumber')
        if not tracking_number:
            return Response({'error': 'Tracking number is required'}, status=400)

        # Input Data
        data = json.dumps({
            'includeDetailedScans': True,
            'trackingInfo': [
                {
                    'trackingNumberInfo': {
                        'trackingNumber': tracking_number
                    }
                }
            ]
        })
        headers = {
            'Content-Type': "application/json",
            'X-locale': "en_US",
            'Authorization': "Bearer " + authRes["access_token"]
        }

        # Make API Call
        response = requests.post(
            f"{config('FEDEX_BASE_API_URL')}/track/v1/trackingnumbers",
            data=data,
            headers=headers
        )

        if response.status_code == 200:
            try:
                scan_events = response.json()["output"]["completeTrackResults"][0]["trackResults"][0]["scanEvents"]
                tracking_details = [
                    {
                        'eventDescription': event.get('eventDescription', ''),
                        'city': event.get('scanLocation', {}).get('city', '')
                    }
                    for event in scan_events
                ]
                return Response({"tracking_details": tracking_details})
            except Exception as e:
                print("Error parsing FedEx tracking response:", e)
                return Response({'error': 'Unexpected response structure'}, status=500)
        else:
            print("FedEx Tracking Error:", response.status_code, response.text)
            return Response({'error': 'Failed to fetch tracking information'}, status=response.status_code)