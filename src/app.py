import gradio as gr

with gr.Blocks() as app:
    gr.Markdown("# Gemini Collaborator App")
    gr.Textbox(label="Example Input")
    gr.Button("Run")

app.launch()