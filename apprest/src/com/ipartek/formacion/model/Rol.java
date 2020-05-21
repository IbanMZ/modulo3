package com.ipartek.formacion.model;

public class Rol {
	
	private int idRol;
	
	private String idNombre;
	
	

	public Rol() {
		super();
		this.idRol = 0;
		this.idNombre = "";
	}



	public int getIdRol() {
		return idRol;
	}



	public void setIdRol(int idRol) {
		this.idRol = idRol;
	}



	public String getIdNombre() {
		return idNombre;
	}



	public void setIdNombre(String idNombre) {
		this.idNombre = idNombre;
	}



	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idNombre == null) ? 0 : idNombre.hashCode());
		result = prime * result + idRol;
		return result;
	}



	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Rol other = (Rol) obj;
		if (idNombre == null) {
			if (other.idNombre != null)
				return false;
		} else if (!idNombre.equals(other.idNombre))
			return false;
		if (idRol != other.idRol)
			return false;
		return true;
	}



	@Override
	public String toString() {
		return "Rol [idRol=" + idRol + ", idNombre=" + idNombre + "]";
	}
	
	
	
	

}
