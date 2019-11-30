FROM ruby:2.6.5-stretch
RUN apt-get install -y wget
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs libsqlite3-dev

RUN apt-get install -y xfonts-utils
RUN wget http://mirrors.kernel.org/ubuntu/pool/main/x/xfonts-utils/xfonts-utils_7.7+3_amd64.deb -P /var/www/downloads
RUN dpkg -i /var/www/downloads/xfonts-utils_7.7+3_amd64.deb

RUN wget http://mirrors.kernel.org/ubuntu/pool/main/x/xfonts-base/xfonts-base_1.0.4+nmu1_all.deb -P /var/www/downloads
RUN dpkg -i /var/www/downloads/xfonts-base_1.0.4+nmu1_all.deb

RUN wget http://mirrors.kernel.org/ubuntu/pool/universe/x/xfonts-75dpi/xfonts-75dpi_1.0.4+nmu1_all.deb -P /var/www/downloads
RUN dpkg -i /var/www/downloads/xfonts-75dpi_1.0.4+nmu1_all.deb

RUN wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.5/wkhtmltox_0.12.5-1.stretch_amd64.deb -P /var/www
RUN dpkg -i  /var/www/wkhtmltox_0.12.5-1.stretch_amd64.deb

RUN apt-get update -y

WORKDIR /api
COPY Gemfile /api/Gemfile
RUN bundle install --without development test
ENV RAILS_ENV production
RUN rails assets:precompile