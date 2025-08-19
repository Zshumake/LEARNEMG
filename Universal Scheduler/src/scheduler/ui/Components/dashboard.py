import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, timedelta
import time


def render():
    """Render the Dashboard component with proper light mode"""

    st.markdown("## 🎯 System Overview")

    # System Status Section
    st.markdown("### System Component Status")

    system_components = {
        "Component": [
            "Quota Tracker",
            "Rule Parser",
            "CSP Engine",
            "Validation Framework",
            "API Layer",
        ],
        "Status": ["Active", "Active", "Active", "Active", "Active"],
        "Last Check": [
            datetime.now() - timedelta(minutes=2),
            datetime.now() - timedelta(minutes=1),
            datetime.now() - timedelta(minutes=3),
            datetime.now() - timedelta(minutes=1),
            datetime.now() - timedelta(minutes=4),
        ],
    }

    # Display system status in columns with light mode colors
    col1, col2, col3, col4, col5 = st.columns(5)

    status_icons = {"Active": "🟢", "Inactive": "🔴", "Warning": "🟡"}

    for i, (col, component) in enumerate(
        zip([col1, col2, col3, col4, col5], system_components["Component"])
    ):
        with col:
            status = system_components["Status"][i]
            icon = status_icons.get(status, "⚫")

            # Light mode status cards
            st.markdown(
                f"""
            <div style="
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                padding: 1.2rem;
                border-radius: 10px;
                text-align: center;
                color: #333333;
                margin-bottom: 1rem;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                border: 1px solid #dee2e6;
            ">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">{icon}</div>
                <div style="font-weight: bold; font-size: 0.9rem; margin-bottom: 0.3rem; color: #495057;">{component}</div>
                <div style="font-size: 1.1rem; font-weight: bold; color: #28a745;">{status}</div>
                <div style="font-size: 0.75rem; color: #6c757d;">Operational</div>
            </div>
            """,
                unsafe_allow_html=True,
            )

    # Quick Actions Section
    st.markdown("### Quick Actions")

    action_col1, action_col2, action_col3 = st.columns(3)

    with action_col1:
        if st.button(
            "🚀 Run Complete Workflow", type="primary", use_container_width=True
        ):
            run_complete_workflow()

    with action_col2:
        if st.button("📊 Generate Sample Schedule", use_container_width=True):
            st.success("Sample schedule generation started! Check the CSP Engine tab.")

    with action_col3:
        if st.button("📥 Export System Config", use_container_width=True):
            export_system_config()

    # Quick Stats Section with light mode colors
    st.markdown("### Quick Statistics")

    stat_col1, stat_col2, stat_col3, stat_col4 = st.columns(4)

    stats = [
        {
            "label": "👥 Active Residents",
            "value": "12",
            "delta": "2 new this quarter",
            "color": "#28a745",
        },
        {
            "label": "📋 Active Rules",
            "value": "47",
            "delta": "5 updated this week",
            "color": "#007bff",
        },
        {
            "label": "🛡️ Constraints",
            "value": "23",
            "delta": "All passing",
            "color": "#fd7e14",
        },
        {
            "label": "✅ Tests Passed",
            "value": "95%",
            "delta": "2% improvement",
            "color": "#6f42c1",
        },
    ]

    for i, (col, stat) in enumerate(
        zip([stat_col1, stat_col2, stat_col3, stat_col4], stats)
    ):
        with col:
            st.markdown(
                f"""
            <div style="
                background: white;
                padding: 1.5rem;
                border-radius: 10px;
                border-left: 4px solid {stat['color']};
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                margin-bottom: 1rem;
                border: 1px solid #e9ecef;
            ">
                <div style="color: #6c757d; font-size: 0.9rem; margin-bottom: 0.5rem;">{stat['label']}</div>
                <div style="color: #212529; font-size: 2rem; font-weight: bold; margin-bottom: 0.3rem;">{stat['value']}</div>
                <div style="color: {stat['color']}; font-size: 0.8rem;">↗ {stat['delta']}</div>
            </div>
            """,
                unsafe_allow_html=True,
            )

    # Recent Activity Section
    st.markdown("### Recent Activity")

    activity_data = {
        "Time": [
            datetime.now() - timedelta(minutes=5),
            datetime.now() - timedelta(minutes=15),
            datetime.now() - timedelta(minutes=30),
            datetime.now() - timedelta(hours=1),
            datetime.now() - timedelta(hours=2),
        ],
        "Action": [
            "Schedule generated for August 2025",
            "New rule added: PGY-2 moonlight restriction",
            "Quota tracking updated",
            "System validation passed",
            "User preferences updated",
        ],
        "Component": [
            "CSP Engine",
            "Rule Parser",
            "Quota Tracker",
            "Validation Framework",
            "User Management",
        ],
        "Status": [
            "✅ Success",
            "✅ Success",
            "✅ Success",
            "✅ Success",
            "✅ Success",
        ],
    }

    activity_df = pd.DataFrame(activity_data)
    activity_df["Time"] = activity_df["Time"].dt.strftime("%H:%M:%S")

    # Style the dataframe for light mode
    st.dataframe(
        activity_df,
        use_container_width=True,
        hide_index=True,
        column_config={
            "Time": st.column_config.TextColumn("Time", width=100),
            "Action": st.column_config.TextColumn("Action", width=300),
            "Component": st.column_config.TextColumn("Component", width=150),
            "Status": st.column_config.TextColumn("Status", width=100),
        },
    )

    # System Health Chart
    st.markdown("### System Performance (Last 24 Hours)")

    # Generate sample performance data
    hours = list(range(24))
    performance_data = {
        "Hour": [f"{h:02d}:00" for h in hours],
        "CPU Usage (%)": [
            50 + 20 * (0.5 - abs(h - 12) / 24) + 5 * (h % 3) for h in hours
        ],
        "Memory Usage (%)": [
            30 + 15 * (0.7 - abs(h - 14) / 24) + 3 * (h % 4) for h in hours
        ],
        "Response Time (ms)": [
            200 + 100 * (0.3 + abs(h - 16) / 24) + 20 * (h % 2) for h in hours
        ],
    }

    perf_df = pd.DataFrame(performance_data)

    fig = go.Figure()
    fig.add_trace(
        go.Scatter(
            x=perf_df["Hour"],
            y=perf_df["CPU Usage (%)"],
            mode="lines+markers",
            name="CPU Usage (%)",
            line=dict(color="#dc3545", width=3),
        )
    )
    fig.add_trace(
        go.Scatter(
            x=perf_df["Hour"],
            y=perf_df["Memory Usage (%)"],
            mode="lines+markers",
            name="Memory Usage (%)",
            line=dict(color="#20c997", width=3),
        )
    )
    fig.add_trace(
        go.Scatter(
            x=perf_df["Hour"],
            y=perf_df["Response Time (ms)"],
            mode="lines+markers",
            name="Response Time (ms)",
            line=dict(color="#007bff", width=3),
            yaxis="y2",
        )
    )

    fig.update_layout(
        title="System Performance Metrics",
        xaxis_title="Time (24H)",
        yaxis_title="Usage (%)",
        yaxis2=dict(title="Response Time (ms)", overlaying="y", side="right"),
        hovermode="x unified",
        height=400,
        plot_bgcolor="white",
        paper_bgcolor="white",
        font=dict(color="#333333"),
    )

    st.plotly_chart(fig, use_container_width=True)

    # Component Health Summary
    st.markdown("### Component Health Summary")

    health_data = {
        "Component": [
            "Quota Tracker",
            "Rule Parser",
            "CSP Engine",
            "Validation Framework",
            "API Layer",
        ],
        "Health Score": [98, 95, 97, 99, 96],
        "Uptime": ["99.9%", "99.5%", "99.8%", "100%", "99.6%"],
        "Last Updated": [
            "2 min ago",
            "1 min ago",
            "3 min ago",
            "1 min ago",
            "4 min ago",
        ],
    }

    health_df = pd.DataFrame(health_data)

    # Create health score bar chart with light mode colors
    fig_health = px.bar(
        health_df,
        x="Component",
        y="Health Score",
        title="Component Health Scores",
        color="Health Score",
        color_continuous_scale="RdYlGn",
        range_color=[90, 100],
    )
    fig_health.update_layout(
        height=300,
        plot_bgcolor="white",
        paper_bgcolor="white",
        font=dict(color="#333333"),
    )
    st.plotly_chart(fig_health, use_container_width=True)


def run_complete_workflow():
    """Simulate running the complete workflow"""

    workflow_steps = [
        "🔄 Initializing system components...",
        "📊 Loading quota data...",
        "📝 Parsing custom rules...",
        "🎯 Generating optimal schedule...",
        "🛡️ Running validation checks...",
        "🔗 Syncing with external systems...",
        "📊 Generating reports...",
        "✅ Workflow complete!",
    ]

    progress_container = st.container()

    with progress_container:
        progress_bar = st.progress(0)
        status_text = st.empty()

        for i, step in enumerate(workflow_steps):
            status_text.markdown(f"**{step}**")
            progress_bar.progress((i + 1) / len(workflow_steps))
            time.sleep(0.8)

        progress_container.empty()
        st.success("🎉 Complete workflow executed successfully!")
        st.balloons()


def export_system_config():
    """Export system configuration"""

    config_data = {
        "system_info": {
            "version": "1.0.0",
            "last_updated": datetime.now().isoformat(),
            "components": [
                "Quota Tracker",
                "Rule Parser",
                "CSP Engine",
                "Validation Framework",
                "API Layer",
            ],
        },
        "settings": {
            "max_residents": 50,
            "supported_formats": ["xlsx", "csv", "manual_entry"],
            "default_algorithm": "backtracking",
            "validation_tiers": 5,
        },
    }

    import json

    config_json = json.dumps(config_data, indent=2)

    st.download_button(
        label="📥 Download Configuration",
        data=config_json,
        file_name=f"scheduler_config_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
        mime="application/json",
    )

    st.success("System configuration exported successfully!")
