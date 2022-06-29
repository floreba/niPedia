Rails.application.routes.draw do

  root to: 'notes#create_or_find_last_note'
  devise_for :users

  resources :notes, only: %i[update index destroy edit new create]
  resources :folders, only: [:index, :show, :create, :destroy] do
    resources :notes, only: %i[new create]
  end
  resources :taggings, only: [:index, :create, :destroy]

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
