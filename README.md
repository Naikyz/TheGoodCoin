## Problème
Notre principal objectif à travers ce projet a été de mettre en place une manière de décentraliser la vente de biens entre particuliers.
Aujourd'hui la vente de pair-à-pair nécessite l'implication d'un service Tiers (exemple: Le Bon Coin).
Le premier problème est que le service tiers va profiter de la transaction sans lui même y participer.
Le second problème implique les données personnelles qui sont collectées et peuvent alors être réutilisées à des fins commerciale ou autre...
Pour nous passer du Web2 au Web3 c'est transformer un service Web2 en service Web3 en corigeant les différents problèmes grace à la technologie de la BlockChain

## Solution
Notre prototype de projet réalisé en 48h vise alors à proposer une solution entièrement décentralisée qui permet à un utilisateur qui souhaite vendre un bien de pouvoir le faire sans soucier de l'utilisation de ses données et du profit qu'un service tiers pourrait se faire sur sa transaction.
Concrètement, notre plateforme permet d'acheter ou de vendre des biens de particuliers à particulier.
Pour ce faire, nous avons mis en place une solution 100% décentralisée qui permet au vendeur comme à l'acheteur d'avoir un suivi concret de sa commande à l'aide de Non Fungible Token. Actuellement, nous en sommes à une phase de prototypage et donc le système de suivi n'a pas pu être déployer pendant ces 48h.
Or notre objectif est de pouvoir le mettre en place avec un système de suivi de livraison ou chaque acteur de la livraison (Vendeur, Livreur, Acheteur) doit valider chaque étape de celle-ci.

**Explication du système de suivi**

Etape de mise en vente et d'achat:
- Le vendeur va mettre en ligne son produit -> Un nft va donc être générer avec les informations de ce produit.
- L'acheteur va venir acheter ce produit directement sur notre plateforme -> Une transaction va être réalisé de l'acheteur vers la plateforme.
- Les fonds et le NFT vont être stocké dans le contrat en attendant différentes validations des étapes intermédiaire.

Etape de livraison:
- Le livreur (sous forme de point relais) va valider la réception du Colis remis par le vendeur -> Première étape
- Différentes étapes de livraison intermédiaire vont être mises en place pour instoré un suivi en temps réel de la livraison -> Seconde étape
- Le point relais qui va recevoir le colis va valider la réception du Colis remis par le livreur -> Troisième étape, l'acheteur reçois à ce moment là le NFT dans son wallet pour attester de l'authenticité de sa commande.
- L'acheteur va donc se rendre dans ce point relais et envoyer (sous forme d'un système simplifié) le nft au point relais -> Dernière étape
- Lorsque que l'authenticité du nft aura été validé par le point relais, le vendeur recevra les fonds bloqués sur son wallet, et l'acheteur pourra récupérer son colis.
Le NFT sera alors Burn pour pouvoir achever le processus de livraison.

Nous avons pour réaliser ce projet utilisé :
- React-JS pour le front
- Machine Aleph + Python pour le back. (Système fonctionnant avec IPFS).
Nous avons également utilisé Starton pour déployer notre smart contracts (avec le Template ERC-721 fournis par starton) et intéragir avec celui-ci.

Notre plus grand défi technique a été de décentraliser entièrement l'application.
Pour y remédier, nous avons utilisé Aleph qui est un service pemettant d'heberger des machines virtuelles de façon décentralisé.

## Installation
Pour installer notre FrontEnd, vous devez executer:

`
git clone git@github.com:Naikyz/TheGoodCoin.git && cd TheGoodCoin && npm i && npm start
`

Notre backend utilise la technologie AlpehVms.
Aleph est actuellement en production (beta) mais il est possible que les VMs soit encore instable et que les données soient perdues,
pour remédier à ce problème, vous pouvez vous même lancer la VM en installant [Aleph](https://github.com/aleph-im/aleph-vm/blob/main/tutorials/README.md) et run (au root de notre repo):
`
aleph program ./backend main:app
`
Si vous instancier une nouvelle AlpehVm, veuillez indiquer dans le fichier .env le nouveau liens vers celle-ci
`
ALEPH_URL=[YOUR_URL]
`

## Équipe et commentaires
TheGoodCoin (by Ismael, Victor, Alexandre, Maxence, Kylian)
On a appris à utiliser l'API starton pour déployer et intéragir avec un smart-contract.
Nous avons également découvert le "decentralize cloud computing" avec Aleph et IPFS
Et nous avons appris beaucoup sur différents principes de la BlockChain

## Rendu
* Fournissez une explication des fonctionnalités de vos projets. Vous devez obligatoirement lier une vidéo de démonstration et preciser avec screen recording et commentaire.