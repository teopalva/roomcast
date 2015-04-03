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
configs_db = nutella.persist.getJsonStore('db/configs.json')
channels_db = nutella.persist.getJsonStore('db/channels.json')

nutella.net.subscribe('configs/update', lambda do |message, component_id, resource_id|

                        new_configs = message

                        puts 'configs/update:'
                        puts new_configs

                        # Update
                        if new_configs != nil
                          configs_db.transaction {
                            configs_db[:configs] = new_configs
                          }
                        end

                        puts 'Updated DB'

                        # Notify Update
                        configs_db.transaction {
                          publish_configs_update(new_configs)
                        }

                                      end)

nutella.net.handle_requests('configs/retrieve', lambda do |request, component_id, resource_id|
                              puts 'request: ' + request
                              reply = {}
                              if request == {}
                                reply
                              elsif request == 'all'
                                configs_db.transaction {
                                  reply = configs_db['configs']
                                }
                                puts reply
                                reply
                              else
                                # TODO: request on specific rid...
                              end
                                              end)

nutella.net.subscribe('currentConfig/update', lambda do |message, component_id, resource_id|

                                        new_config = message

                                        puts 'currentConfig/update:'
                                        puts new_config

                                        # Update
                                        if new_config != nil
                                          configs_db.transaction {
                                            configs_db[:currentConfig] = new_config
                                          }
                                        end

                                        puts 'Updated DB'

                                        # Notify Update
                                        configs_db.transaction {
                                          publish_current_config_update(new_config)
                                        }

                                      end)

nutella.net.handle_requests('currentConfig/retrieve', lambda do |request, component_id, resource_id|
                                                puts 'request: ' + request
                                                reply = {}
                                                  configs_db.transaction {
                                                    reply = configs_db['currentConfig']
                                                  }
                                                  puts reply
                                                  reply
                                              end)

nutella.net.subscribe('channels/update', lambda do |message, component_id, resource_id|

                                        new_channels = message

                                        # Update
                                        if new_channels != nil
                                          channels_db.transaction {
                                            channels_db[:channels] = new_channels
                                          }
                                        end

                                        # Notify Update
                                        channels_db.transaction {
                                          publish_channels_update(new_channels)
                                        }

                                      end)

nutella.net.handle_requests('channels/retrieve', lambda do |request, component_id, resource_id|
                                                reply = {}
                                                if request == {}
                                                  reply
                                                elsif request == 'all'
                                                  channels_db.transaction {
                                                    reply = channels_db['channels']
                                                  }
                                                  puts reply
                                                  reply
                                                end
                                              end)


def publish_configs_update(configs)
  nutella.net.publish('configs/updated', configs)
  puts 'Sent configs/updated'
end

def publish_current_config_update(config)
  nutella.net.publish('currentConfig/updated', config)
  puts 'Sent currentConfig/updated'
end

def publish_channels_update(channels)
  nutella.net.publish('channels/updated', channels)
  puts 'Sent channels/updated'
end

puts 'Initialization complete.'

# Just sit there waiting for messages to come
nutella.net.listen