import json

from aiohttp import web

from comparator import ImageComparator


async def compare_fingerprint(request):
	try:
		body = await request.json()
		
		# get the fingerprint from the request body
		matrix = body['instances']
		
		# return a success json response with status code 200 i.e. 'OK'
		return web.Response(text=json.dumps(ImageComparator().matrix_matcher(matrix=matrix)), status=200)
	
	except Exception as e:
		print(str(e))
		# Failed path where name is not set
		response_obj = {'status': 'failed', 'reason': str(e)}
		# return failed with a status code of 500 i.e. 'Server Error'
		return web.Response(text=json.dumps(response_obj), status=500)


app = web.Application()

routes = [
	web.post('/api/v1/compare', compare_fingerprint),
]

app.add_routes(routes)

web.run_app(app)
