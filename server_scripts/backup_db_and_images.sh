# this script is managed via crontab
# crontab -e
# runs at 2:30 AM
# 30 2 * * * /home/pi/mokznet/backup_db_and_images.sh > /dev/null 2>&1

cd /home/pi/mokznet
TIMESTAMP=$(date +"%Y-%m-%d_%H%M")

# backup database
DB_BACKUP_NAME="mokznet_backup_${TIMESTAMP}.db"
sqlite3 mokznet.db ".backup ${DB_BACKUP_NAME}"
rclone copy ./${DB_BACKUP_NAME} google_drive_simon:mokznet_rclone_backups/database_backups
rm ${DB_BACKUP_NAME}

# backup images
IMAGES_BACKUP_NAME="guestbook_avatars_${TIMESTAMP}.tar.gz"
tar -czf ${IMAGES_BACKUP_NAME} ./guestbook_avatar_images
rclone copy ./${IMAGES_BACKUP_NAME} google_drive_simon:mokznet_rclone_backups/guestbook_images_backups
rm ${IMAGES_BACKUP_NAME}
