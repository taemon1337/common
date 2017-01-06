fn="bootstrap.min.css"
base="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/"
themes=( cerulean cosmo cyborg darkly flatly journal lumen paper readable sandstone simplex slate spacelab superhero united yeti )

glyph="fonts/glyphicons-halflings-regular."
glyphtypes=( eot svg ttf woff woff2 )


for theme in ${themes[@]}; do
  mkdir -p css/bootswatch/$theme
#  wget $base$theme/$fn -O css/bootswatch/$theme/$fn
done

for ext in ${glyphtypes[@]}; do
  mkdir -p css/bootswatch/fonts
  wget $base$glyph$ext -O css/bootswatch/$glyph$ext
done

