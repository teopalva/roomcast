require 'nutella_lib'
require 'net/http'
require 'net/https'
require 'uri'
require 'json'


# Initialize nutella
nutella.init ARGV

puts 'Initializing RoomCast...'

# Open the database
mapping_db = nutella.persist.getJsonStore('db/mapping.json')

nutella.net.subscribe('mapping/update', lambda do |message|

                        new_mapping = message

                        puts new_mapping

                        # Update
                        if new_mapping != nil
                          mapping_db.transaction {
                            mapping_db = new_mapping
                          }
                        end

                        puts 'Updated DB'

                        # Notify Update
                        mapping_db.transaction {
                          publish_mapping_update
                        }

                                      end)

def publish_mapping_update
  nutella.net.publish('mapping/updated', 'Mapping Updated')
end

puts 'Initialization complete.'

# Just sit there waiting for messages to come
nutella.net.listen