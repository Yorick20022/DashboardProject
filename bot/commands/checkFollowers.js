require("dotenv").config()
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { IgApiClient } = require("instagram-private-api")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stat')
        .setDescription('Provides information about the user.')
        .addStringOption(option => option.setName('username').setDescription('Enter username').setRequired(true)),
    async execute(interaction) {
        interaction.deferReply({ ephemeral: false });

        const ig = new IgApiClient();
        ig.state.generateDevice(process.env.IG_USERNAME);

        try {
            await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
        } catch (loginError) {
            console.error('Login error:', loginError);
            await interaction.editReply("An error occurred while processing your request!");
            return; // Exit the function if login fails
        }

        try {
            const username = interaction.options.getString('username');
            const targetUser = await ig.user.searchExact(username);
            const targetUserId = targetUser.pk;
            const targetUserInfo = await ig.user.info(targetUserId);
            const followersAmount = targetUserInfo.follower_count;
            const followingAmount = targetUserInfo.following_count;

            const embed = new EmbedBuilder()
                .setTitle("Account tracker")
                .setDescription("Track IG account stats")
                .addFields([
                    { name: 'Username', value: `${username}`, inline: true },
                    { name: 'Followers', value: `${followersAmount}`, inline: true },
                    { name: 'Following', value: `${followingAmount}`, inline: true },
                ])
                .setColor('#0099ff');

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Error:', error.message);
            await interaction.editReply("An error occurred while processing your request!");
        }
    }
};
