from apscheduler.schedulers.background import BackgroundScheduler
from database import mongo
from datetime import datetime, timedelta

def reset_daily_progress():
    print("Resetting daily progress...")

    today = datetime.utcnow().date()
    yesterday_tasks = mongo.db.tasks.find({"date": today})

    for task in yesterday_tasks:
        task["_id"] = None
        task["date"] = today + timedelta(days=1)
        task["completed"] = False
        mongo.db.tasks.insert_one(task)

    print("Daily reset completed.")

scheduler = BackgroundScheduler()
scheduler.add_job(reset_daily_progress, "cron", hour=0, minute=0)
scheduler.start()
