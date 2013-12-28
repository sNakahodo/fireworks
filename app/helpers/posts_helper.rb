module PostsHelper
	def set_heading formatted_text, links = {}

		tags = []

		links.each do |name, url|
			tags.push(content_tag(:a, name, :href => url, :target => '_blank'))
		end

		return formatted_text %	tags
	end
end
