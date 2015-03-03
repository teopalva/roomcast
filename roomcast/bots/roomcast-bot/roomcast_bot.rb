require 'nutella_lib'

# Parse command line arguments
run_id, broker = nutella.parse_args ARGV
# Extract the component_id
component_id = nutella.extract_component_id
# Initialize nutella
nutella.init( run_id, broker, component_id)
# (Optional) Set the resourceId
nutella.set_resource_id 'my_resource_id'

puts 'Initializing RoomCast...'

# Open the database
mapping_db = nutella.persist.getJsonStore('db/mapping.json')

nutella.net.subscribe('mapping/update', lambda do |message, component_id, resource_id|

                        new_mapping = message

                        puts 'mapping/update:'
                        puts new_mapping

                        # Update
                        if new_mapping != nil
                          mapping_db.transaction {
                            mapping_db[:mapping] = {:mapping => new_mapping}
                          }
                        end

                        puts 'Updated DB'

                        # Notify Update
                        mapping_db.transaction {
                          publish_mapping_update(new_mapping)
                        }

                                      end)

def publish_mapping_update(mapping)
  nutella.net.publish('mapping/updated', mapping)
  puts 'Sent mapping/updated'
end

puts 'Initialization complete.'

# Just sit there waiting for messages to come
nutella.net.listen