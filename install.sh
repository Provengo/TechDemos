wget -nc https://downloads.provengo.tech/releases/Provengo-2023-11-15.uber.jar -O Provengo.uber.jar
wget -nc https://downloads.provengo.tech/shell-scripts/provengo.sh
chmod +x provengo.sh
echo "alias provengo='$(pwd)/provengo.sh'" >> ~/.bashrc 
source ~/.bashrc