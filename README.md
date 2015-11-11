# SEKA
Search Engine Keywords-based Analyzer
=======

# SEKA

<div class="logo">
	<img src="doc/logo.jpg" width=215 height=300 />
</div>


---------------------------------------------------

<p class="strateg">Strategie</p>

---------------------------------------------------

<p class="first-head">
	Descriere proiect:
</p>

Dezvoltaţi o aplicaţie Web responsivă ce permite căutarea de resurse de interes pe baza unui termen ori a unei expresii folosind mai multe motoare de căutare (DuckDuckGo şi altele; eventual, alese de utilizator), plus reţele sociale – Facebook şi Twitter, cel puţin. Pentru fiecare resursă descoperită, instrumentul va prezenta cele mai importante informaţii reunite – preluate, eventual, din mai multe surse. Aceste informaţii vor putea fi salvate local şi partajate – minimal, pe baza serviciului Pocket. Suplimentar, se permite compararea rezultatelor obţinute, cu aplicarea unor posibile filtre şi teme predefinite de vizualizare.


---------------------------------------------------

<p class="strateg">Specificatii</p>

---------------------------------------------------

###### 1.     Divizare functionalitati
<ol>
	<li> Search
	<ol>
		i. Websites
		<ol>
		<li> Vom folosi api-urile de la</li>
			a. Duck duck go
			<br>
			b. Bing
			<br>
			c. google
			<br>
		</ol>
		ii. Persone/companii
			<ol>
				<li>Vom folosi api-urile de la</li>
				a. DuckDuckGo
				<br>
				b.Twitter
				<br>
				c.Linkedin
				<br>
			</ol>
	</ol>
	<li>Salvare info</li>
	<ol>
		<li>Vom salva</li>
		a. In cookie
		<br>
		b.In Contul de Pocket al userului
	</ol>
</ol>

---------------------------------------------------

<p class="strateg">Structura</p>

---------------------------------------------------


<p class="first-head">
	Design:
</p>

1.	Vom structura pagina in trei sectiuni, in stanga va fi o sectiune cu logo-ul, in centru va fi search-ul + rezultate iar in dreapta va fi un meniu pentru partea de salvare
*	Logo – vom folosi un logo icon+text
*	Search rezultate casuta de search va fi sus, iar rezultatele vor aparea in timp real dedesubt cu un layout similar search-urile din sistemele de operare unix.
*	Meniul va fi inchis initial userul avand posibilitatea de a deschide meniul cu un click pe iconita de tip hamburger

---------------------------------------------------

<p class="strateg">Schelet</p>

---------------------------------------------------
![Alt text](doc/mockup.png)

---------------------------------------------------

<p class="strateg">QOC & Suprafata</p>

---------------------------------------------------
1. Cum face user-ul o cautare ?
	<br>
	a. Pentru a cauta userul va folosi bara de search din mijlocul ecranului.
2. Cum salveaza userul o cautare ?
	<br>
	a. Va trebui adauga o iconita care ii permite sa salveze cautarea
3. Cum filtreaza userul cautarea pe un anumit tip de resurse ?
	<br>
	a. Va trebui adaugat un filtru cu ajutorul caruia poate sa filtreze in timp real rezultatele.
4. Cum isi da seama userul de ce are de facut ?
	<br>
	a. Ar trebuii adaugate niste informatii la prima utilizare a site-ului (cookie)
	<br>
	b. Putem face un demo cu bootsrap tour sau ceva de genu

	<p class="first-head">
		Implementare
	</p>



<ol>
	<li> Finalizare design
	<ol>
			a. Adaugare iteme ce apar in urma search-ului
			<br>
			b. Creare meniu dreapta cu datele de salvare si eventual tur-ul boostrap(macar schita)
	</ol>
	<li>Implementare design css+html</li>
	<ol>
		a.	Implementare structura – stanga dreapta size fix (absolut pe mobil) container size fix, maxim 100% width,  centrat
		<br>
		b.	Implementare elemente
		<ol>
			i.	Logo
			<br>
			ii.	Bara search
			<br>
			iii.	Rezultate aparute in urma search-ului
			<br>
			iv.	Meniu stanga
			<br>
		</ol>
		c.	Implementare still css
		<br>
		d.	Implementare animatii,hovere
	</ol>
	<li>Implementare functionalitate</li>
	a.Implementare api-uri javascript pentru returnare date pe baza unui search
		<ol>
			i.	DuckDuckGo
			<br>
			ii. Bing
			<br>
			iii. Google
			iv. Facebook
			v. Linkedin
			vi. Twitter
		</ol>
		b.Implementare functie de transformare si concatenare a rezultatelor pentru afisare
		<ol>
			i. Posibilitatea de filtrare pe baza de parametrii
		</ol>
		c. Implementare functie de afisare a search+filter pe baza parametriilor get
		<br>
		d. Implementare functie de stocare/listare a url-urilor in cookie la cererea utilizatorilor
		<br>
		e. Implementare functie de stocare a url-urilor in pocket.
		<br>
</ol>
