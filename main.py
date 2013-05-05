#!/usr/bin/env python
import webapp2
import jinja2
import os

# define jinja environment to serve template files
jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__) + '/templates'))

class MainHandler(webapp2.RequestHandler):
	""" Main handler for my page"""
	def get(self):
		template = jinja_environment.get_template('portfolio.html')
		self.response.out.write(template.render())

class PortfolioHandler(webapp2.RequestHandler):
	""" Portfolio handler for stephsit.com/portfolio"""
	def get(self):
		template = jinja_environment.get_template('portfolio.html')
		self.response.out.write(template.render())


app = webapp2.WSGIApplication([
    ('/', MainHandler),
	('/portfolio', PortfolioHandler)
], debug=True)
