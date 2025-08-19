import streamlit as st
from streamlit_option_menu import option_menu
import sys
import os
import importlib.util

# Page configuration - MUST BE FIRST
st.set_page_config(
    page_title="Universal Medical Residency Scheduler",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded"
)

def load_component(component_name):
    """Load a component module directly from file"""
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        component_path = os.path.join(current_dir, 'components', f'{component_name}.py')
        
        if not os.path.exists(component_path):
            print(f"DEBUG: Component file not found: {component_path}")
            return None
            
        spec = importlib.util.spec_from_file_location(component_name, component_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        print(f"DEBUG: Successfully loaded {component_name}")
        return module
    except Exception as e:
        print(f"DEBUG: Failed to load {component_name}: {e}")
        return None

# Load components
print("DEBUG: Loading components...")
dashboard = load_component('dashboard')
resident_management = load_component('resident_management')
schedule_generator = load_component('schedule_generator')
quota_tracker = load_component('quota_tracker')
rule_parser = load_component('rule_parser')
csp_engine = load_component('csp_engine')

def main():
    """Main application entry point"""
    
    # Force light mode with custom CSS
    st.markdown("""
    <style>
    /* Force light mode */
    .stApp {
        background-color: #FFFFFF !important;
        color: #000000 !important;
    }
    
    /* Header styling */
    .main-header {
        padding: 1.5rem 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        margin-bottom: 2rem;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    /* Component cards */
    .component-card {
        background: white !important;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin-bottom: 1.5rem;
        border: 1px solid #e0e0e0;
        color: #333333 !important;
    }
    
    /* Sidebar styling */
    .css-1d391kg {
        background-color: #f8f9fa !important;
    }
    
    /* Main content area */
    .main .block-container {
        background-color: #ffffff !important;
        color: #000000 !important;
    }
    
    /* Text elements */
    .stMarkdown, .stText, p, h1, h2, h3, h4, h5, h6 {
        color: #333333 !important;
    }
    
    /* Buttons */
    .stButton > button {
        background-color: #ffffff !important;
        color: #333333 !important;
        border: 1px solid #cccccc !important;
        border-radius: 8px;
        padding: 0.5rem 1rem;
        font-weight: 500;
    }
    
    .stButton > button:hover {
        background-color: #f8f9fa !important;
        border-color: #999999 !important;
    }
    
    /* Primary buttons */
    .stButton > button[kind="primary"] {
        background-color: #007bff !important;
        color: white !important;
        border: none !important;
    }
    
    .stButton > button[kind="primary"]:hover {
        background-color: #0056b3 !important;
    }
    
    /* Metrics */
    .metric-card {
        background: white !important;
        padding: 1.5rem;
        border-radius: 10px;
        border-left: 4px solid #007bff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin-bottom: 1rem;
    }
    
    /* Tables and DataFrames */
    .stDataFrame {
        background-color: white !important;
        color: #333333 !important;
    }
    
    .stDataFrame table {
        background-color: white !important;
        color: #333333 !important;
    }
    
    .stDataFrame th {
        background-color: #f8f9fa !important;
        color: #333333 !important;
    }
    
    .stDataFrame td {
        background-color: white !important;
        color: #333333 !important;
    }
    
    /* Input fields */
    .stTextInput > div > div > input,
    .stTextArea > div > div > textarea,
    .stSelectbox > div > div > div,
    .stMultiSelect > div > div > div,
    .stNumberInput > div > div > input {
        background-color: white !important;
        color: #333333 !important;
        border: 1px solid #cccccc !important;
    }
    
    /* Expanders */
    .streamlit-expanderHeader {
        background-color: #f8f9fa !important;
        color: #333333 !important;
    }
    
    /* Success/Error messages */
    .stSuccess {
        background-color: #d4edda !important;
        color: #155724 !important;
        border: 1px solid #c3e6cb !important;
    }
    
    .stError {
        background-color: #f8d7da !important;
        color: #721c24 !important;
        border: 1px solid #f5c6cb !important;
    }
    
    .stWarning {
        background-color: #fff3cd !important;
        color: #856404 !important;
        border: 1px solid #ffeaa7 !important;
    }
    
    .stInfo {
        background-color: #d1ecf1 !important;
        color: #0c5460 !important;
        border: 1px solid #bee5eb !important;
    }
    
    /* Forms */
    .stForm {
        background-color: white !important;
        border: 1px solid #e0e0e0 !important;
        border-radius: 8px;
        padding: 1rem;
    }
    
    /* Tabs */
    .stTabs > div > div > div > div {
        background-color: white !important;
        color: #333333 !important;
    }
    
    /* Containers */
    .element-container {
        background-color: transparent !important;
    }
    
    /* Progress bars */
    .stProgress > div > div > div {
        background-color: #007bff !important;
    }
    </style>
    """, unsafe_allow_html=True)
    
    # Main header
    st.markdown("""
    <div class="main-header">
        <h1>🏥 Universal Medical Residency Scheduler</h1>
        <p style="margin: 0; font-size: 1.1rem; opacity: 0.9;">AI-Enhanced Scheduling Platform for Any Residency Program</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Sidebar navigation
    with st.sidebar:
        st.markdown("### Navigation")
        selected = option_menu(
            menu_title=None,
            options=[
                "Dashboard",
                "Resident Management",
                "Schedule Generator",
                "Quota Tracker",
                "Rule Parser",
                "CSP Engine",
                "Validation",
                "Testing Suite",
                "Integration"
            ],
            icons=[
                "speedometer2",
                "people-fill",
                "calendar3",
                "clipboard-data",
                "brain",
                "calculator",
                "shield-check",
                "flask",
                "diagram-3"
            ],
            menu_icon="cast",
            default_index=0,
            styles={
                "container": {"padding": "0!important", "background-color": "#f8f9fa"},
                "icon": {"color": "#007bff", "font-size": "18px"},
                "nav-link": {
                    "font-size": "16px",
                    "text-align": "left",
                    "margin": "0px",
                    "--hover-color": "#e9ecef",
                    "color": "#333333"
                },
                "nav-link-selected": {"background-color": "#007bff", "color": "white"},
            }
        )
    
    # Route to selected component
    try:
        if selected == "Dashboard":
            if dashboard and hasattr(dashboard, 'render'):
                dashboard.render()
            else:
                st.error("❌ Dashboard component not available")
                show_debug_info()
                
        elif selected == "Resident Management":
            if resident_management and hasattr(resident_management, 'render'):
                resident_management.render()
            else:
                st.error("❌ Resident Management component not available")
                show_debug_info()
                
        elif selected == "Schedule Generator":
            if schedule_generator and hasattr(schedule_generator, 'render'):
                schedule_generator.render()
            else:
                st.error("❌ Schedule Generator component not available")
                show_debug_info()
                
        elif selected == "Quota Tracker":
            if quota_tracker and hasattr(quota_tracker, 'render'):
                quota_tracker.render()
            else:
                st.error("❌ Quota Tracker component not available")
                show_debug_info()
                
        elif selected == "Rule Parser":
            if rule_parser and hasattr(rule_parser, 'render'):
                rule_parser.render()
            else:
                st.error("❌ Rule Parser component not available")
                show_debug_info()
        elif selected == "CSP Engine":
            if csp_engine and hasattr(csp_engine, 'render'):
                csp_engine.render()
            else:
                st.error("❌ CSP Engine component not available")
                show_debug_info()
        elif selected == "Validation":
            show_placeholder("Validation")
        elif selected == "Testing Suite":
            show_placeholder("Testing Suite")
        elif selected == "Integration":
            show_placeholder("Integration")
    except Exception as e:
        st.error(f"Error loading component '{selected}': {e}")
        st.exception(e)
        show_debug_info()

def show_placeholder(component_name):
    """Show placeholder for unimplemented components"""
    st.markdown(f"""
    <div class="component-card">
        <h2>🚧 {component_name} Component</h2>
        <p style="color: #666666;">This component is under development. Please check back soon!</p>
        <p><strong>Planned Features:</strong></p>
        <ul style="color: #666666;">
            <li>Full {component_name.lower()} functionality</li>
            <li>Interactive user interface</li>
            <li>Data export capabilities</li>
            <li>Integration with other components</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)

def show_debug_info():
    """Show debug information for troubleshooting"""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    components_dir = os.path.join(current_dir, 'components')
    
    st.markdown("### 🔍 Debug Information")
    
    debug_info = f"""
**Current Directory:** `{current_dir}`

**Components Directory:** `{components_dir}`

**Components folder exists:** {os.path.exists(components_dir)}

**Dashboard file exists:** {os.path.exists(os.path.join(components_dir, 'dashboard.py'))}

**Rule Parser file exists:** {os.path.exists(os.path.join(components_dir, 'rule_parser.py'))}
    """
    
    if os.path.exists(components_dir):
        files = os.listdir(components_dir)
        debug_info += f"\n\n**Files in components folder:** {files}"
    
    st.markdown(debug_info)

if __name__ == "__main__":
    main()
