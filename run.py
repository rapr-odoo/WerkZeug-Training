from cmath import sqrt
from collections import OrderedDict
import io
import json
import logging
import os
from random import randint
from urllib import response
from werkzeug.serving import run_simple
import hashlib

import psycopg2

from jinja2 import Environment, FileSystemLoader
from lxml import etree


from werkzeug.routing import Map, Rule
from werkzeug.exceptions import HTTPException
from werkzeug.middleware.shared_data import SharedDataMiddleware
from werkzeug.wrappers import Request, Response

_logger = logging.getLogger(__name__)

class NumbersApp(object):
  def __init__(self):
    template_path = os.path.join(os.path.dirname(__file__), 'templates')
    self.jinja_env = Environment(loader=FileSystemLoader(template_path), autoescape=True)
    self.url_map = Map([
      Rule('/', endpoint='index'),
      Rule('/numbers', endpoint='numbers'),
      Rule('/loadqweb', endpoint='loadQweb')
    ])


  def dispatch_request(self, request, start_response):
    """Dispatches the request."""
    # print("In dispatch ::: ")
    # print(self, request.environ, sep='\n\n')

    adapter = self.url_map.bind_to_environ(request.environ)
    try:
        endpoint, values = adapter.match()
        response = getattr(self, endpoint)(request, **values)
        # return response(environ, start_response)
        return response
    except HTTPException as e:
        return e


  def wsgi_app(self, environ, start_response):
    """WSGI application that processes requests and returns responses."""
    # print("In __Wsgi__ ::: ")
    # print(self, environ, start_response, sep='\n\n')
    request = Request(environ)
    print(f"Request::: {request}")
    response = self.dispatch_request(request, start_response)
    return response(environ, start_response)


  def __call__(self, environ, start_response):
    """The WSGI server calls this method as the WSGI application."""
    # print("In __Call__ ::: ")
    # print(f"self:: {self}", f"environ::: {environ}", start_response, sep='\n\n')
    return self.wsgi_app(environ, start_response)


  def render_template(self, template_name, **context):
    """Renders the specified template file using the Jinja templating engine."""

    template = self.jinja_env.get_template(template_name)
    return Response(template.render(context.get('render_context')), mimetype='text/html')


  # def _read_addon_file(self, file_path):
  #   """Reads the content of a file given by file_path
  #   Usefull to make 'self' testable
  #   :param str file_path:
  #   :returns: str
  #   """
  #   with open(file_path, 'rb') as fp:
  #     contents = fp.read()
  #   return contents

  # def loadQweb(self, request):
  #   # TODO: MSH: Do not specify here which templates to load, create manifest file
  #   # where all templates are defined and read manifest file and load all templates
  #   # concanate all templates and return to client so client can call qweb.add_templates

  #   files = [
  #       "static/js/app/app.xml",
  #       # "static/js/components/header/header.xml",
  #       # "static/js/components/header/cart.xml",
  #       # "static/js/components/product_list/product_list.xml",
  #       # "static/js/components/footer/footer.xml",
  #       # "static/js/components/product/product.xml",
  #       # "static/js/components/product_detail/product_detail.xml",
  #       # "static/js/screens/productDetailsScreen/product_details_screen.xml",
  #   ]

  #   # No need to use right now
  #   # concatedXml = self._concat_xml(files)
  #   concatedXml = self._read_addon_file(files)
  #   concatedXml = concatedXml.decode("utf-8")

  #   # TODO: MSH: Develop server architecture so that it accepts both http and json request and return response accordingly
  #   response = {
  #       'jsonrpc': '2.0',
  #       # 'id': request.get('id')
  #   }
  #   mime = 'application/json'
  #   result = {'result': concatedXml}
  #   body = json.dumps(result)
  #   # return Response(concatedXml, mimetype='text/xml')
  #   return Response(
  #       body, status=200,
  #       headers=[('Content-Type', mime), ('Content-Length', len(body))]
  #   )


  # def index(self, request):
  #   return self.render_template('base.html')


  def index(self, request):
    file_path = os.path.join(os.path.dirname(__file__), 'templates/index.html')
    file_data = None
    with open(file_path, "rb") as fp:
      file_data = fp.read()
    return Response(file_data, content_type="text/html")


  def numbers(self, request):
    # conn = psycopg2.connect(database='numbers', user='postgres', password='postgres', host='localhost', port='5432')
    # cur = conn.cursor()
    tableRows = list(dict())
    rows_count = 10
    for n in range(rows_count):
      rand = randint(1,100)
      tableRows.append({'number': rand, 'root': round(sqrt(rand).real, 3)})
    for row in tableRows: print("{:<5} {:<7}".format(row['number'], row['root']))
    # conn.close()

    return self.render_template('numbers.html', render_context = {'data': tableRows})


def create_app():
  app = NumbersApp()
  return app


if __name__ == '__main__':
  # Run the Werkzeug development server to serve the WSGI application (MovieApp)
  app = create_app()
  app.wsgi_app = SharedDataMiddleware(
      app.wsgi_app, {"/static": os.path.join(os.path.dirname(__file__), "static")}
  )
  run_simple('127.0.0.1', 5000, app, use_debugger=True, use_reloader=True)