Part of Android & Web Development - ISMIN 2021

Course followed by students of Mines St Etienne, ISMIN - M2 Computer Science.

[![Mines St Etienne](./logo.png)](https://www.mines-stetienne.fr/)

# Projet Application Android et API qui permet de voir les informations des Crous en France

## 1- API:
 C'est une API NestJS écrit en TypeScript, elle est déployée sur CleverCloud et vous pouvez la tester avec Postman sur le lien suivant:
 https://crous-renovations.cleverapps.io/crous
 Les requêtes que vous pouvez tester ( dans la collection Postman vous pouvez trouvé toutes ces requêtes):
 - des GET requests sur le path /crous, vous pouvez en plus evnoyer un GET au path /crous?type=... , les types sont Restaurant,Cafétéria,Kiosque, Brasserie...
 - des PUT requests sur le path /crous/id en remplaçant id par une valeur de l'id d'un crous (voir les résultats d'une GET request pour avoir un id), en plus il faut avoir le crous en Body, cette requête va soit mettre le crous en favori, soit l'enlever des favoris. (Attention: dans le postman collection si vous voulez tester cette partie, il y a une request POST avec un crous ayant l'id r1, vous pouvez voir que favorite devient true, mais si vous voulez la changer en false, il faut utiliser la même request mais changer favorite dans Body à true, et l'API va la changer en false).
 - des POST requests pour faire une recherche soit par id soit par type, sur le path /crous/search et un { "term": ... } dans le Body, qui retourne une liste de Crous du type spécifié, ou le crous ayant l'id spécifié.
 - des DELETE request au path /crous/id qui va supprimer le Crous ayant l'id donnée.
 - des POST requests au path /crous, avec un Crous dans le Body (ça ajoute le Crous mais renvoie un internal server error après)
 - des GET requests sur le path /crous/id (remplacer id par un id) pour récupérer un Crous ayant l'id donné.

Un postman collection est disponible dans le repository que vous pouvez utiliser pour tester toutes ces requests.


## 2- Android:
L’application consiste à afficher les différents types de Crous dans une liste où on peut avoir le détail de chaque élément en cliquant dessus et pouvoir les mettre en favori si possible.
Ainsi, les étapes effectuées sont :
-	Mise en place d’un ToolBar contenant 3 Tabs, List, Map et Info permettant de naviger facilement les fragments: CrousListFragment, CrousMapFragment et CrousInfoFragment.
-	Création d’un fragment « CrousListFragment » pour mettre les listes de données. 
-	Création d’un fragment « CrousMapFragment » pour marquer les places des crous sur une carte, avec la possibilité de cliquer sur un marker pour voir les détails.
-	Création d'une activity DetailActivity, qui peut être accéder soit par cliquant sur un crous dans la liste, soit en cliquant sur un marker sur la carte.
-	Création d'un fragment << CrousInfoFragment>> contenant des informations du projet, avec un lien vers les données et un bouton qui vous amène à une activity contenat une liste des licenses.
L'application est capable de:
- Charger les données de l'API déployée sur CleverCloud (Crous-API-HIJ-LH) en utilisant retrofit.
- Le bouton refresh permet de redemander les données de l'API afin de les mettre à jour.
- Envoyer des données entres 2 activities en utilisant Intent.
- Envoyer des données entre un fragment et une activity en utilisant RecyclerView + Adapter
- Afficher une image à partie d'un lien (les objects Crous contienne une variable image qui est un lien vers l'image) et utilisant une librairie que nous avons trouvé sur github et qui s'appelle Glide (vous pouvez aller à app.gradle pour voir l'implementation).
- Ajouter un marker sur la carte pour chaque Crous.

