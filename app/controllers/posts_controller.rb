class PostsController < ApplicationController

	def set_headings

		@header_text = ''
		@footer_text = 'Powered by %s & %s'

		link_ror = 'http://rubyonrails.org/'
		link_gsap = 'http://www.greensock.com/gsap-js/'
	
		@links = {}

		if /.*(phone|pad|pod|tablet)+/i.match(request.user_agent)
			@header_text = 'For Your Happy New Year'
			@links = {'Rails' => link_ror, 'GSAP' => link_gsap}
		else
			@header_text = 'For Your Happy New Year ~ 2013 - 2014 ~'
			@links = {'Ruby on Rails' => link_ror, 'GSAP TweenMax' => link_gsap}
		end

  end

  def index
		set_headings
		@post = Post.new()
  end

	def create

		@post = Post.new(post_params)

		result = false
		message = ''

		if @post.save
			result = true
		elsif @post.errors.any?
			@post.errors.messages[:text].each do |msg|
				message += msg + ' '
			end
		end

		render json: {:result => result, :message => message}

	end

	def show

		total = Post.count
		random = Random.new()
		result = {};

		if total > 0

			data = Post.find(:all, conditions: ['id = ?', random.rand(total) + 1]);

			if data.length > 0
				result = data[0]
			end

		end

		render :layout => 'ajax', :json => result

	end

	private
    def post_params
      params.require(:post).permit(:text)
    end
end
