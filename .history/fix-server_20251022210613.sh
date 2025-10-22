#!/bin/bash
# Fix server.js line 40

# Replace the broken line with the correct one
sed -i '40c\app.use(express.json({ limit: "10mb" }));' /var/www/cccc/server.js

echo "Fixed line 40 in server.js"
echo "New line 40:"
sed -n '40p' /var/www/cccc/server.js