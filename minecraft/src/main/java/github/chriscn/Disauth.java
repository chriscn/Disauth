package github.chriscn;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import net.md_5.bungee.api.ChatColor;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.permissions.Permission;
import org.bukkit.plugin.java.JavaPlugin;

public final class Disauth extends JavaPlugin {

    public Permission authPerm = new Permission("disauth.authenticate");
    boolean needPermission = true; //TODO implemenet this in a config

    @Override
    public void onEnable() {
        // Plugin startup logic
        Bukkit.getPluginManager().addPermission(authPerm);
        getCommand("authenticate").setExecutor(new CommandExecutor() {
            @Override
            public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
                if (sender instanceof Player) {
                    Player player = (Player) sender;
                    if (needPermission) {
                        if (player.hasPermission(authPerm)) {
                            String perm = NanoIdUtils.randomNanoId();

                        } else {
                            player.sendMessage(ChatColor.RED + "You need permission to use this command.");
                            return true;
                        }
                    }
                } else {
                    sender.sendMessage(ChatColor.RED + "You can only authenticate as a player.");
                }
                return false;
            }
        });
    }

    @Override
    public void onDisable() {
        // Plugin shutdown logic
    }
}
