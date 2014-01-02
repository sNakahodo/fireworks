class PostsController < ApplicationController

  def index
    set_headings
    @post = Post.new()
  end

  def create

    @post = Post.new(post_params)

    message = ''
    status = 422

    if @post.save
      status = 200
    elsif @post.invalid?
      status = 202
      message = @post.errors.messages[:text].join(' ')
    end

    render json: {:message => message}, status: status 

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

    def set_headings

      @header_text = ''
      @footer_text = 'Powered by %s & %s.'

      link_ror = 'http://rubyonrails.org/'
      link_gsap = 'http://www.greensock.com/gsap-js/'
      link_twitter = 'https://twitter.com/ShuNak80'
    
      @links = {}

      if /.*(phone|pad|pod|tablet)+/i.match(request.user_agent)
        @header_text = 'For Your Happy New Year'
        @footer_text += ' Dev: %s'
        @links = {'Rails' => link_ror, 'GSAP' => link_gsap, '@ShuNak80' => link_twitter}
      else
        @header_text = 'For Your Happy New Year ~ 2013 - 2014 ~'
        @footer_text += ' Developed by: %s'
        @links = {'Ruby on Rails' => link_ror, 'GSAP TweenMax' => link_gsap, '@ShuNak80' => link_twitter}
      end

    end
end
