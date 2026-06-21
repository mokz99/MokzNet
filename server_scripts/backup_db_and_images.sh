# this script is managed via crontab
# crontab -e
# runs at 2:30 AM
# 30 2 * * * /home/pi/mokznet/backup_db_and_images.sh > /dev/null 2>&1

cd /home/pi/mokznet

# backup database
TIMESTAMP=$(date +"%Y-%m-%d_%H%M")
BACKUP_NAME="mokznet_backup_${TIMESTAMP}.db"
sqlite3 mokznet.db ".backup ${BACKUP_NAME}"
rclone copy ./${BACKUP_NAME} google_drive_simon:mokznet_rclone_backups/database_backups
rm ${BACKUP_NAME}

# todo backup images - same idea except its a folder