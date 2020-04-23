/*
  Controlla se l'oggetto disco può raggiungere un GOAL avversario in base al disc fornito in ingresso e ad eventuali collisioni con altri oggetti attraverso una funzione ricorsiva.
  @param  disc
          disc in evoluzione libera
  @param  k1
          numero di frame già percorsi dal disc
  @param  canvas
          oggetto usato per mostrare a video i risultati
*/
function shotInGoal(disc,k1=0,canvas=null)
{	
  //Va definita una funzione di energia e di controllo su di essa per verificare se la palla può raggiungere il goal
  
	var k_index = Infinity;
	var obj = null;
  //Controllo su ogni disc tranne che la palla
	for(var index = 1; index < room.S.F.length; index++)
	{
		var prev = previsionCollisionStaticDisc(disc, room.S.F[index]);
		if (prev < k_index)
		{
			k_index = prev;
			obj = [room.S.F[index], 0];
		}
	}
  //Controllo su ogni plane (retta)
	for(var index = 0; index < room.S.qa.length;index++)
	{
		var prev = previsionCollisionPlane(disc,room.S.qa[index]);
		if (prev < k_index)
		{
			k_index = prev;
			obj = [room.S.qa[index], 1];
		}
	}
	k_index = Math.floor(k_index) -1;
	
	if(canvas != null)
	{
		
		canvas.beginPath();
		canvas.moveTo(disc.a.x, disc.a.y);
	}
  //Ricalcolo posizioni del disco
	disc.a.x = (disc.a.x + disc.D.x * (1 - Math.pow(disc.Ca,k_index))/(1-disc.Ca));
	disc.a.y = (disc.a.y + disc.D.y * (1 - Math.pow(disc.Ca,k_index))/(1-disc.Ca));
  
	if(canvas != null)
	{
		canvas.lineTo(disc.a.x, disc.a.y);
		canvas.stroke();
	}
  
  //Se ci sono oggetti collidenti
	if(obj != null)
	{
		switch(obj[1]){
			case 0:
				resolveDDCollision(disc,obj[0])
				shotInGoal(disc,k_index,canvas);
				break;
			case 1:
				resolveDPCollision(disc,obj[0])
				shotInGoal(disc,k_index,canvas);
				break;
			case 3:
				break;		
		}
	}
  
	return -1
}
