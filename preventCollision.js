/*
  Ottenuto reference a questo oggetto:
	room = {
		I = playerList[] = {
			Kd = flag
			Wb = isKicking
			ob = input
			w = username
			V = id
			ea = team = {
				v = cGroup
				w = name
			}
			H = disc =
			{
				Ca = damping
				aa = invMass
				m = bCoef
				aa = pos { x, y }
				D = vel { x, y }
				oa = gravity { x, y }
				v = cGroup
				h = cMask
				Z = Radius
			}
		}
		S = stadium = {
			$ = width
			qc = height
			ge = playerPhysics
			F = discList[] = {
				Ca = damping
				aa = invMass
				m = bCoef
				a = pos { x, y }
				D = vel { x, y }
				oa = gravity { x, y }
				v = cGroup
				h = cMask
				Z = Radius
			}//disk[0] = ball, players are not added
			J = vertexList[] = 
			{
				a = pos { x, y }
				m = bCoef;
				h = cMask;
				v = cGroup;
			}
			U = segmentList[] =
			{
				CC = bias
				m = bCoef
				vb = curve
				Za = visible
				W = v0 = vertex
				ca = v1 = vertex
				h = cMask
				v = vGroup
			}
			qa = planeList[] = {
				Ua = distance
				h = cMask
				v = cGroup
				m = bCoeff
				wa = direction { x,y }
			}
			tc = goalList[] = {
				W = point1 { x, y }
				V = point2 { x, y }
				qe = team = {
					v = cGroup
					w = name
				}
			}
		}
		jc = name;
		prototype = {
			na = function(index) = getPlayerFromId(index)
		}
	}
*/
function previsionCollisionStaticDisc(disc1,disc2)
{
	x_distance = disc1.a.x - disc2.a.x;
	y_distance = disc1.a.y - disc2.a.y;
	r_sum = disc1.Z + disc2.Z;
	delta = Math.pow(x_distance * vox + y_distance * voy,2) - (vox * vox + voy * voy) * (x_distance * x_distance + y_distance * y_distance - r_sum * r_sum);
	if(delta < 0) return Infinity;
	sol_1 = Math.log(1 + (1 - disc1.Ca) * (x_distance * vox + y_distance * voy + Math.sqrt(delta)) / (vox * vox + voy * voy)) / Math.log(disc1.Ca)
	sol_2 = Math.log(1 + (1 - disc1.Ca) * (x_distance * vox + y_distance * voy - Math.sqrt(delta)) / (vox * vox + voy * voy)) / Math.log(disc1.Ca)
	if(sol_1 >= 0 && sol_1 <= sol_2)
		return sol_1
	if(sol_2 >= 0 && sol_2 <= sol_1)
		return sol_2
	return Infinity;
}

function previsionCollisionPlane(disc,plane)
{
	direction = plane.wa;
	k = Math.log( 1 - ( (1 - disc.Ca ) * ( disc.Z + plane.Ua - direction.x * disc.a.x - direction.y * disc.a.y ) / ( direction.x * vox + direction.y * voy ) ) ) / Math.log(disc.Ca)
	return (k > 0) ? k : Infinity;
}
