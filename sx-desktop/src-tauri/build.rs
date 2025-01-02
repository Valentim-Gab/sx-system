use dotenv::dotenv;

fn main() {
    dotenv().ok();
    tauri_build::build()
}
