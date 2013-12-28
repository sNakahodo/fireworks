class Post < ActiveRecord::Base

	validates :text, presence: {:message => 'Please type in.'},
	length: {minimum: 10, maximum: 100, message: 'Message must be within 100 letters'}


end
