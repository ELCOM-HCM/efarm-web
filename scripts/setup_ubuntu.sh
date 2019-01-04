#!/bin/sh
echo "Start setup"
cd /etc/init.d/
echo "Following file execute...."
chmod a+x service_8083
chmod a+x service_3001
chmod a+x service_9090
echo "Add execute file DONE"

echo "Add service"
update-rc.d service_8083 defaults
systemctl daemon-reload

update-rc.d service_3001 defaults
systemctl daemon-reload

update-rc.d service_9090 defaults
systemctl daemon-reload

echo "Add service DONE"

echo "All setup complete!"

