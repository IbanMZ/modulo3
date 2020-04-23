package com.ipartek.formacion.model;

public class Noticia {

	private int idNoticia;
	private String titularNoticia;
	private String fechaNoticia;
	private String textoNoticia;
	
	
	public Noticia() {
		super();
		this.idNoticia = 0;
		this.titularNoticia = "";
		this.fechaNoticia = "";
		this.textoNoticia = "";
	}
	
	public int getIdNoticia() {
		return idNoticia;
	}
	public void setIdNoticia(int idNoticia) {
		this.idNoticia = idNoticia;
	}
	public String getTitularNoticia() {
		return titularNoticia;
	}
	public void setTitularNoticia(String titularNoticia) {
		this.titularNoticia = titularNoticia;
	}
	public String getFechaNoticia() {
		return fechaNoticia;
	}
	public void setFechaNoticia(String fechaNoticia) {
		this.fechaNoticia = fechaNoticia;
	}
	public String getTextoNoticia() {
		return textoNoticia;
	}
	public void setTextoNoticia(String textoNoticia) {
		this.textoNoticia = textoNoticia;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((fechaNoticia == null) ? 0 : fechaNoticia.hashCode());
		result = prime * result + idNoticia;
		result = prime * result + ((textoNoticia == null) ? 0 : textoNoticia.hashCode());
		result = prime * result + ((titularNoticia == null) ? 0 : titularNoticia.hashCode());
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
		Noticia other = (Noticia) obj;
		if (fechaNoticia == null) {
			if (other.fechaNoticia != null)
				return false;
		} else if (!fechaNoticia.equals(other.fechaNoticia))
			return false;
		if (idNoticia != other.idNoticia)
			return false;
		if (textoNoticia == null) {
			if (other.textoNoticia != null)
				return false;
		} else if (!textoNoticia.equals(other.textoNoticia))
			return false;
		if (titularNoticia == null) {
			if (other.titularNoticia != null)
				return false;
		} else if (!titularNoticia.equals(other.titularNoticia))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Noticia [idNoticia=" + idNoticia + ", titularNoticia=" + titularNoticia + ", fechaNoticia="
				+ fechaNoticia + ", textoNoticia=" + textoNoticia + "]";
	}
	
}
