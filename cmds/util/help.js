const Command = require("../../typedefs/Command");
const Discord = require("discord.js")
const fs = require("fs")

class Help extends Command{

    constructor(client){

        super("help","util","Command list, what do you expect",client)

        /**
         * 
         * @param {Discord.Message} msg 
         * @param {*} args 
         * @returns 
         */

        this.cmd = async function(msg,args){

            let search = args[0]
            //console.log(args)
            if(this.client.commands.has(search)){

                /** @type {Command} command */
                let command = this.client.commands.get(search)
                let embed = new Discord.MessageEmbed()
                embed.setAuthor(msg.author.username + "#" + msg.author.discriminator,msg.author.avatarURL())

                if(command.description !== undefined) embed.description = command.description
                else{msg.channel.send("This command does not have a description"); return;}

                embed.color = this.client.colors.red
                if(command.image != undefined) embed.setImage(command.image)

                let aliases = ""
                this.client.commands.get(search).aliases.forEach(aliase => {

                    aliases += (aliase + ", ")

                })

                aliases = aliases.substr(0,aliases.length-2)

                if(aliases === "") aliases = "**None**"

                embed.addField("Aliases:", aliases, true)


                msg.channel.send(embed)

            }else{

                if(this.client.groups.has(search)){

                    let des = "Here are a list of commands of this command group:\n"
                    let group = this.client.groups.get(search)

                    group.forEach(key=>{

                        des += ("-``"+key+"``\n")

                    })

                    des += "\nDo cn!help ``command name`` for more information!"
                    let embed = new Discord.MessageEmbed()
                    embed.setAuthor(msg.author.username + "#" + msg.author.discriminator,msg.author.avatarURL())
                    embed.description = des
                    embed.color = this.client.colors.red

                    msg.channel.send(embed)

                }else{

                    if(search != undefined) msg.channel.send("Cannot find the command you are looking for. But here's a list of command groups you can check out!")
                    let des = "List of command groups:\n"
                    this.client.groups.keyArray().forEach(key=>{
                        if(!(key === "Owner")) des += ("-``"+key+"``\n")
                    })
                    des += "\nDo cn!help ``command_group_name`` for more informations!"
                    let embed = new Discord.MessageEmbed()
                    embed.setAuthor(msg.author.username + "#" + msg.author.discriminator,msg.author.avatarURL())
                    embed.description = des
                    embed.color = this.client.colors.red

                    msg.channel.send(embed)

                }

            }

        }

    }


}

module.exports = Help
