use std::env;
use std::fs;
use std::process::Command;

fn main() {
    // Verifica se estamos compilando PARA o Windows
    if env::var("CARGO_CFG_TARGET_OS").unwrap_or_default() == "windows" {
        let manifest_dir = env::var("CARGO_MANIFEST_DIR").expect("CARGO_MANIFEST_DIR");
        let out_dir = env::var("OUT_DIR").expect("OUT_DIR");

        // Usar barras normais (/) funciona perfeitamente no rc.exe e evita problemas de escape
        let icon_path = format!("{}/icons/icon.ico", manifest_dir.replace("\\", "/"));
        let rc_content = format!("1 ICON \"{}\"\r\n", icon_path);
        
        let rc_path = format!("{}/resource.rc", out_dir.replace("\\", "/"));
        fs::write(&rc_path, rc_content).expect("Falha ao escrever resource.rc");

        let res_path = format!("{}/resource.res", out_dir.replace("\\", "/"));

        // Executa o rc.exe do próprio ambiente MSVC (sem caminhos fixos)
        let status = Command::new("rc.exe")
            .args(&["/r", "/fo", &res_path, &rc_path])
            .status()
            .expect("rc.exe nao encontrado no PATH. Certifique-se de que o Build Tools do VS esta instalado.");

        if !status.success() {
            panic!("rc.exe falhou ao compilar o recurso.");
        }

        // Informa o cargo para linkar o arquivo .res diretamente
        println!("cargo:rustc-link-arg={}", res_path);
        println!("cargo:rerun-if-changed=icons/icon.ico");
    }

    tauri_build::build()
}
