class UsersController < ApplicationController
  before_filter :require_no_user, :only => [:new, :create]
  before_filter :require_user, :only => [:show, :edit, :update]

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    # block! see user_sessions_controller.rb for description
    @user.save do |result|
      if result
        flash[:notice] = "Account registered!"
        redirect_to "/"
      else
        redirect_to login_url
      end
    end
  end

  def show
    puts "SESSION: #{session.inspect}"
    puts @current_user.access_tokens.inspect
    @user = @current_user
  end
end
