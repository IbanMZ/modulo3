package com.ipartek.formacion.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class Curso {
	
	private int idCurso;
	
	@Size( min=2, max = 50, message = "minimo 2 maximo 50 carcateres" )
	private String nombreCurso;
	
	@NotEmpty
	private String fotoCurso;
	
	@NotEmpty
	private Float precio;
	
	

	public Curso() {
		super();
		this.idCurso = 0;
		this.nombreCurso = "";
		this.fotoCurso = "";
		this.precio = (float) 0;
	}



	public int getIdCurso() {
		return idCurso;
	}



	public void setIdCurso(int idCurso) {
		this.idCurso = idCurso;
	}



	public String getNombreCurso() {
		return nombreCurso;
	}



	public void setNombreCurso(String nombreCurso) {
		this.nombreCurso = nombreCurso;
	}



	public String getFotoCurso() {
		return fotoCurso;
	}



	public void setFotoCurso(String fotoCurso) {
		this.fotoCurso = fotoCurso;
	}



	public Float getPrecio() {
		return precio;
	}



	public void setPrecio(Float precio) {
		this.precio = precio;
	}



	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((fotoCurso == null) ? 0 : fotoCurso.hashCode());
		result = prime * result + idCurso;
		result = prime * result + ((nombreCurso == null) ? 0 : nombreCurso.hashCode());
		result = prime * result + ((precio == null) ? 0 : precio.hashCode());
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
		Curso other = (Curso) obj;
		if (fotoCurso == null) {
			if (other.fotoCurso != null)
				return false;
		} else if (!fotoCurso.equals(other.fotoCurso))
			return false;
		if (idCurso != other.idCurso)
			return false;
		if (nombreCurso == null) {
			if (other.nombreCurso != null)
				return false;
		} else if (!nombreCurso.equals(other.nombreCurso))
			return false;
		if (precio == null) {
			if (other.precio != null)
				return false;
		} else if (!precio.equals(other.precio))
			return false;
		return true;
	}



	@Override
	public String toString() {
		return "Curso [idCurso=" + idCurso + ", nombreCurso=" + nombreCurso + ", fotoCurso=" + fotoCurso + ", precio="
				+ precio + "]";
	} 

	
	
}
